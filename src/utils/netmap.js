import PromisePool from "es6-promise-pool";

export default class NetMap {
  constructor({ timeout, protocol } = {}) {
    this.timeout = timeout || 1000;
    this.protocol = protocol || "http";
  }

  pingSweep(hosts, { maxConnections, port } = {}) {
    return new Promise((resolve, reject) => {
      // best estimate for maxConnections based on
      // https://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser
      // which may not be up-to-date or accurate
      port = port || 45000;
      maxConnections =
        maxConnections ||
        (function () {
          if (window.chrome) return 10;
          else return 17;
        })();

      const results = {
        hosts: [],
        meta: {
          hosts: hosts,
          ports: [port],
          maxConnections: maxConnections,
          startTime: new Date().getTime(),
        },
      };

      this._scan(hosts, [port], {
        maxConnections: maxConnections,
        timeout: this.timeout,
      }).then((scanResults) => {
        for (let i in scanResults) {
          const result = {
            host: scanResults[i].host,
            delta: scanResults[i].ports[0].delta,
            live: false,
          };

          if (result.delta < this.timeout) {
            result.live = true;
          }

          results.hosts.push(result);
        }

        results.meta.endTime = new Date().getTime();
        results.meta.scanDuration = results.meta.endTime - results.meta.startTime;
        resolve(results);
      });
    });
  }

  tcpScan(hosts, ports, { portCallback, maxConnections, controlPort, controlRatio } = {}) {
    return new Promise((resolve, reject) => {
      // best estimate for maxConnections based on
      // https://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser
      // which may not be up-to-date or accurate
      maxConnections = maxConnections || 6;
      controlPort = controlPort || 45000;
      controlRatio = controlRatio || 0.8;

      const results = {
        meta: {
          hosts: hosts,
          ports: ports,
          maxConnections: maxConnections,
          controlPort: controlPort,
          controlRatio: controlRatio,
          startTime: new Date().getTime(),
        },
      };

      // main port scan
      this._scan(hosts, ports, {
        maxConnections: maxConnections,
        timeout: this.timeout,
        portCallback: portCallback,
      })
        .then((scanResults) => {
          results.hosts = scanResults;
          return this.pingSweep(hosts, { port: controlPort });
        })
        .then((controlResults) => {
          for (let i in controlResults.hosts) {
            let result = results.hosts.find(function (value) {
              return value.host === controlResults.hosts[i].host;
            });
            result.control = controlResults.hosts[i].delta;

            for (let j in result.ports) {
              let ratio =
                Math.min(result.ports[j].delta, result.control) /
                Math.max(result.ports[j].delta, result.control);
              if (ratio > controlRatio) {
                result.ports[j].open = false;
              } else {
                result.ports[j].open = true;
              }
            }
          }

          results.meta.endTime = new Date().getTime();
          results.meta.scanDuration = results.meta.endTime - results.meta.startTime;
          resolve(results);
        });
    });
  }

  _scan(hosts, ports, { portCallback, maxConnections } = {}) {
    return new Promise((resolve, reject) => {
      maxConnections = maxConnections || 6;
      const results = hosts.map((host) => ({ host, ports: [] }));

      const self = this;
      const pool = new PromisePool(function* () {
        for (let i = 0; i < hosts.length; i++) {
          for (let j = 0; j < ports.length; j++) {
            yield self._checkPort(hosts[i], ports[j], {
              timeout: self.timeout,
              protocol: self.protocol,
            });
          }
        }
      }, maxConnections);

      pool.addEventListener("fulfilled", (event) => {
        let result = results.find(function (value) {
          return value.host === event.data.result.host;
        });

        result.ports.push({
          port: event.data.result.port,
          delta: event.data.result.delta,
        });

        if (portCallback) portCallback(event.data.result);
      });

      pool.start().then(() => {
        resolve(results);
      });
    });
  }

  _checkPort(host, port, { timeout, protocol } = {}) {
    return new Promise((resolve, reject) => {
      timeout = timeout || 1000;
      protocol = protocol || "http";
      const start = new Date().getTime();
      let interval;

      const img = new Image();
      img.src = protocol + "://" + host + ":" + port;
      img.onerror = function () {
        let delta = new Date().getTime() - start;

        if (delta < timeout) {
          clearInterval(interval);
          img.src = "";
          resolve({
            host: host,
            port: port,
            delta: delta,
          });
        }
      };
      img.onload = img.onerror;

      interval = setInterval(function () {
        var delta = new Date().getTime() - start;

        if (delta >= timeout) {
          if (!img) return;
          img.src = "";
          clearInterval(interval);
          resolve({
            host: host,
            port: port,
            delta: delta,
          });
        }
      }, 1);
    });
  }
}
