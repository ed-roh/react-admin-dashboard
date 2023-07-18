import React from 'react';
import Pdp from '../analytics/Pdp';

const Psc = () => {
  return (
    <div className="d-flex">
      <div className="rounded bg-white p-3" style={{ flex: '1', marginRight: '1rem' }}>
        <div className="text">
          <p>
            Your Attempt <span>80</span>
          </p>
          <p>
            Attempted On <span>2023/04/30</span>
          </p>
          <p>
            Time Taken <span>45m</span>
          </p>
          <p>
            Bank <span>1/5</span>
          </p>
          <p>
            Correct <span>30%</span>
          </p>
          <p>
            Marks Obtained <span>68.00/80</span>
          </p>
          <p>
            Shipped <span></span>
          </p>
          <p>
            Time Taken <span>46m</span>
          </p>
          <p>
            Correct Questions <span>36</span>
          </p>
          <p>
            Incorrect Questions <span></span>
          </p>
          <p>
            Skipped Question <span></span>
          </p>
        </div>
      </div>
      <div className="graph" style={{ flex: '2', marginLeft: '1rem' }}>
        {<Pdp />}
      </div>
    </div>
  );
};

export default Psc;
