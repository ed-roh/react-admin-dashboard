import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  Box,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/PersonRemove";
import InviteIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";
import SimpleBackDrop from "./SimpleBackDrop";
import { supabase } from "../supabase";
import NetMap from "../utils/netmap";
import PropTypes from "prop-types";

const netmap = new NetMap({ timeout: 200 });

const hosts = [
  "192.168.1.1",
  "192.168.1.254",
  "10.0.1.1",
  "10.0.1.254",
  "10.1.1.1",
  "10.1.1.254",
  "172.16.1.1",
  "172.16.1.254",
  "192.168.2.1",
  "192.168.2.254",
  "10.0.2.1",
  "10.0.2.254",
  "10.2.2.1",
  "10.2.2.254",
  "172.16.2.1",
  "172.16.2.254",
  "192.168.3.1",
  "192.168.3.254",
  "10.0.3.1",
  "10.0.3.254",
  "10.3.3.1",
  "10.3.3.254",
  "172.16.3.1",
  "172.16.3.254",
  "192.168.4.1",
  "192.168.4.254",
  "10.0.4.1",
  "10.0.4.254",
  "10.4.4.1",
  "10.4.4.254",
  "172.16.4.1",
  "172.16.4.254",
  "192.168.5.1",
  "192.168.5.254",
  "10.0.5.1",
  "10.0.5.254",
  "10.5.5.1",
  "10.5.5.254",
  "172.16.5.1",
  "172.16.5.254",
  "192.168.6.1",
  "192.168.6.254",
  "10.0.6.1",
  "10.0.6.254",
  "10.6.6.1",
  "10.6.6.254",
  "172.16.6.1",
  "172.16.6.254",
  "192.168.7.1",
  "192.168.7.254",
  "10.0.7.1",
  "10.0.7.254",
  "10.7.7.1",
  "10.7.7.254",
  "172.16.7.1",
  "172.16.7.254",
  "192.168.8.1",
  "192.168.8.254",
  "10.0.8.1",
  "10.0.8.254",
  "10.8.8.1",
  "10.8.8.254",
  "172.16.8.1",
  "172.16.8.254",
  "192.168.9.1",
  "192.168.9.254",
  "10.0.9.1",
  "10.0.9.254",
  "10.9.9.1",
  "10.9.9.254",
  "172.16.9.1",
  "172.16.9.254",
  "192.168.10.1",
  "192.168.10.254",
  "10.0.10.1",
  "10.0.10.254",
  "10.10.10.1",
  "10.10.10.254",
  "172.16.10.1",
  "172.16.10.254",
  "192.168.100.1",
  "192.168.100.254",
  "10.0.100.1",
  "10.0.100.254",
  "10.100.100.1",
  "10.100.100.254",
  "172.16.100.1",
  "172.16.100.254",
  "192.168.200.1",
  "192.168.200.254",
  "10.0.200.1",
  "10.0.200.254",
  "10.200.200.1",
  "10.200.200.254",
  "172.16.200.1",
  "172.16.200.254",
  "192.168.254.1",
  "192.168.254.254",
  "10.0.254.1",
  "10.0.254.254",
  "10.254.254.1",
  "10.254.254.254",
  "172.16.254.1",
  "172.16.254.254",
  "192.168.168.1",
  "192.168.168.254",
  "192.168.192.1",
  "192.168.192.254",
  "10.10.0.1",
  "10.10.0.254",
];

const steps = ["Welcome", "Profile", "Company", "People", "Vendors", "Network", "Getting Started"];
let scanned = 0;
let networkInfo = [];
let companyId = "";
let googlecompany = {};

export function FirstLogin({ user }) {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [domainInfo, setDomainInfo] = useState(null);
  const [emailAddresses, setEmailAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClose = () => {
    // make sure steps complete, save stuff
    if (activeStep >= 3) {
      setOpen(false);
      navigate("/dashboard");
    }
  };

  const handleCompanyInfoChange = (field) => (e) => {
    setCompanyInfo({
      ...companyInfo,
      [field]: e.target.value,
    });
  };

  const handleDomainInfoChange = (field) => (e) => {
    setDomainInfo({
      ...domainInfo,
      [field]: e.target.value,
    });
  };

  const handleUserInfoChange = (field) => (e) => {
    setUserInfo({
      ...userInfo,
      [field]: e.target.value,
    });
  };

  const handleEmailChange = (index, field) => (event) => {
    setEmailAddresses((prevEmailAddresses) => {
      const newEmailAddresses = [...prevEmailAddresses];
      newEmailAddresses[index][field] = event.target.value;
      return newEmailAddresses;
    });
  };

  const handleEmailDelete = (index) => {
    setEmailAddresses((prevEmails) => prevEmails.filter((_, i) => i !== index));
  };

  const handleEmailInvite = (index) => {
    // invite user
  };

  const handleAddEmailRow = () => {
    const newEmailAddresses = [
      { email: "", full_name: "", department: "", title: "", valid: true, customer_id: user.id },
      ...emailAddresses,
    ];
    setEmailAddresses(newEmailAddresses);
  };

  async function saveCompanyData() {
    const { data, error } = await supabase.from("customers").upsert(companyInfo).select();

    return data;
  }

  async function saveContactData() {
    const { data, error } = await supabase.from("contacts").upsert(emailAddresses).select();

    return data;
  }

  async function saveDomainData() {
    const { data, error } = await supabase.from("domains").upsert(domainInfo).select();

    return data;
  }

  async function saveUserData() {
    const { data, error } = await supabase
      .from("users")
      .upsert({ id: user.id, full_name: userInfo.full_name, customer_id: user.id })
      .select();

    return data;
  }

  function getStepContent(step) {
    let result = "";
    switch (step) {
      case 0:
        return (
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Typography>
              Welcome to the KBS Clearisk Portal, the ultimate platform for capturing and managing
              online technology risks. Almost every action your business takes happens on the
              internet, which presents both opportunities and challenges. As organizations navigate
              the complexities of today&apos;s connected world, the need to proactively manage risks
              has never been more critical.
              <br></br>
              <br></br>
              That is where we come in!
              <br></br>
              <br></br>
              By employing White Hat hacker techniques that scan the internet and gather fragments
              of information from diverse sources, our cutting-edge platform doesn&apos;t just
              streamline the account set up process; it unveils a panoramic view of your
              company&apos;s online presence, providing both the visible and hidden facets of your
              digital footprint to build a comprehensive picture of your organization&apos;s digital
              identity. By applying these various data gathering methods, we give you an unmatched
              understanding of your online environment all while just setting up your account.
              <br></br>
              <br></br>
              KnowByte Solutions - where information transforms into insight, and risk transforms
              into opportunity.
            </Typography>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <TextField
              label="Full Name"
              onChange={handleUserInfoChange("full_name")}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={user.email}
              onChange={handleUserInfoChange("email")}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Title"
              onChange={handleUserInfoChange("title")}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Department"
              onChange={handleUserInfoChange("department")}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <TextField
              label="Company Name"
              value={companyInfo.name}
              onChange={handleCompanyInfoChange("name")}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              value={companyInfo.address}
              onChange={handleCompanyInfoChange("address")}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              value={companyInfo.phone || ""}
              onChange={handleCompanyInfoChange("phone")}
              margin="normal"
            />
            <TextField
              label="Industry"
              value={companyInfo.industry}
              onChange={handleCompanyInfoChange("industry")}
              margin="normal"
            />

            <Typography variant="h6">Social Media</Typography>
            <TextField
              label="Website"
              value={companyInfo.website}
              onChange={handleCompanyInfoChange("website")}
              margin="normal"
            />
            <TextField
              label="Facebook"
              value={companyInfo.facebook}
              onChange={handleCompanyInfoChange("facebook")}
              margin="normal"
            />
            <TextField
              label="LinkedIn"
              value={companyInfo.linkedin}
              onChange={handleCompanyInfoChange("linkedin")}
              margin="normal"
            />
            <TextField
              label="Instagram"
              value={companyInfo.instagram}
              onChange={handleCompanyInfoChange("instagram")}
              margin="normal"
            />
            <TextField
              label="Twitter"
              value={companyInfo.twitter}
              onChange={handleCompanyInfoChange("twitter")}
              margin="normal"
            />
            <TextField
              label="YouTube"
              value={companyInfo.youtube}
              onChange={handleCompanyInfoChange("youtube")}
              margin="normal"
            />
          </Box>
        );
      case 3:
        const existingUser = emailAddresses.find((email) => email.email === user.email);

        // If user email does not exist, add it to the list
        if (!existingUser) {
          emailAddresses.unshift({
            email: user.email,
            full_name: userInfo.full_name || "",
            department: userInfo.department || "",
            title: userInfo.title || "",
            customer_id: user.id,
            valid: true,
          });
        }
        result = saveCompanyData();
        result = saveUserData();
        return (
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Button variant="contained" fullWidth onClick={handleAddEmailRow}>
              Add Person
            </Button>
            {emailAddresses.map((email, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                sx={{ "& > :not(style)": { m: 1 } }}
              >
                <IconButton onClick={() => handleEmailInvite(index)}>
                  <InviteIcon fontSize="large" style={{ color: "green" }} />
                </IconButton>
                <IconButton onClick={() => handleEmailDelete(index)}>
                  <DeleteIcon fontSize="large" style={{ color: "red" }} />
                </IconButton>
                <TextField
                  label="Name"
                  value={email.full_name}
                  onChange={handleEmailChange(index, "full_name")}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  value={email.email}
                  onChange={handleEmailChange(index, "email")}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Title"
                  value={email.title}
                  onChange={handleEmailChange(index, "title")}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Department"
                  value={email.department}
                  onChange={handleEmailChange(index, "department")}
                  fullWidth
                  margin="normal"
                />
              </Box>
            ))}
          </Box>
        );
      case 4:
        result = saveContactData();
        return (
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <TextField
              label="Email Provider"
              value={domainInfo.mx || ""}
              fullWidth
              onChange={handleDomainInfoChange("mx")}
              margin="normal"
            />
            <TextField
              label="DNS Provider"
              value={domainInfo.ns || ""}
              fullWidth
              onChange={handleDomainInfoChange("ns")}
              margin="normal"
            />
            <TextField
              label="Web Hosting Provider"
              value={domainInfo.hosting || ""}
              fullWidth
              onChange={handleDomainInfoChange("hosting")}
              margin="normal"
            />
            <TextField
              label="Website Technology"
              value={domainInfo.webserver || ""}
              fullWidth
              onChange={handleDomainInfoChange("webserver")}
              margin="normal"
            />
          </Box>
        );
      case 5:
        result = saveDomainData();
        if (!scanned) {
          setIsLoading(true);
          netmap.pingSweep(hosts, { port: 443 }).then((results) => {
            results.hosts.map((host) => {
              const regex = /\.\d+$/;
              let network = host.host.replace(regex, ".0/24");
              if (host.live & !networkInfo.includes(network)) {
                networkInfo.push(network);
              }
            });
            scanned = 1;
            setIsLoading(false);
          });
        }

        return (
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            {networkInfo.map((host) => (
              <Box
                key={host}
                display="flex"
                alignItems="center"
                sx={{ "& > :not(style)": { m: 1 } }}
              >
                <TextField label="Network" value={host} fullWidth margin="normal" />
              </Box>
            ))}
          </Box>
        );
      case 6:
        return (
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Typography>
              Time to jump in an start managing your risk! We will guide you through the next steps
              as you look around.
              <br></br>
              <br></br>
              KnowByte Solutions - where information transforms into insight, and risk transforms
              into opportunity.
            </Typography>
          </Box>
        );
      default:
        //create users and send invites
        //save vendors
        //save networks ? vlans
        setOpen(false);
        navigate("/");
    }
  }

  useEffect(() => {
    const domain_name = user.email.split("@")[1];
    //const domain_name = "phillipsstaffing.com";
    async function fetchData() {
      try {
        setIsLoading(true);
        // Retrieve company information from Google Places API
        var service = new window.google.maps.places.PlacesService(document.createElement("div"));
        var request = {
          query: domain_name,
          fields: ["name", "formatted_address", "place_id", "types"],
        };

        service.findPlaceFromQuery(request, function (results, status) {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            var placeId = results[0].place_id;
            var detailsRequest = {
              placeId: placeId,
              fields: ["name", "formatted_address", "formatted_phone_number", "types"],
            };
            service.getDetails(detailsRequest, function (place, status) {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                googlecompany = {
                  name: place.name || domain_name,
                  address: place.formatted_address || "",
                  phone: place.formatted_phone_number || "",
                  industry: place.types.join(", ") || "",
                };
                const company = {
                  id: user.id,
                  name: googlecompany.name || domain_name,
                  website: "http://" + domain_name || "",
                  address: googlecompany.address || "",
                  phone: googlecompany.phone || "",
                  industry: googlecompany.industry,

                  /*       facebook: res.data.facebook || "",
                  linkedin: res.data.linkedin || "",
                  instagram: res.data.instagram || "",
                  twitter: res.data.twitter || "",
                  youtube: res.data.youtube || "", */
                };
                setCompanyInfo(company);
              }
            });
          }
        });

        let url = "https://host.io/api/full/" + domain_name + "?token=20619bd198b2b1";
        let domain = {};
        domain.domain = domain_name;
        setDomainInfo(domain);
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data.dns) {
              let regex = /[^.]+\.[^.]+\.$/;

              domain.mx = data.dns.mx[0].match(regex)[0];
              if (Object.entries(data.ipinfo)[0][1].asn.name) {
                domain.hosting = Object.entries(data.ipinfo)[0][1].asn.name;
              } else {
                domain.hosting = Object.entries(data.ipinfo)[1][1].asn.name;
              }
              domain.ns = data.dns.ns[0].match(regex)[0];
              domain.webserver = data.web.server;
              domain.customer_id = user.id;
            } else {
              domain.mx = "";
              domain.hosting = "";
              domain.ns = "";
              domain.webserver = "";
            }
            setIsLoading(false);
            setDomainInfo(domain);

          })
          .catch((error) => {
            console.error("An error occurred:", error);
            domain.domain = domain_name;
            setDomainInfo(domain);
          });

          

        /*         // Retrieve email addresses from hunter.io
        const hunter = new EmailHunter("71d76759ceb19999f0cbda7968a5e5d6c898735b");
        hunter.domainSearch({ domain: domain_name, limit: 100 }, (err, res) => {
          if (res && res.data && res.data.emails) {
            const excludedDepartments = ["sales", "Sales"];
            const excludedTypes = ["generic"];

            const filteredEmails = res.data.emails
              .filter((email) => !excludedDepartments.includes(email.department))
              .filter((email) => !excludedTypes.includes(email.type))
              .filter((email) => email.value);

            const emailAddresses = filteredEmails.map((email) => ({
              customer_id: user.id,
              email: email.value || "",
              full_name: (email.first_name || "") + " " + (email.last_name || ""),
              department: email.department || "",
              title: email.title || "",
              valid: false,
            }));

            const name = res.data.organization || googlecompany.name;
            const address =
              googlecompany.address ||
              res.data.street +
                " " +
                res.data.city +
                ", " +
                res.data.state +
                " " +
                res.data.postal_code;
            const industry = res.data.industry || googlecompany.industry; */

        /* 

          //let url='https://api.ipify.org/?format=json'
          //fetch public ip then do a lookup on who it is for internet provider


          let url='https://haveibeenpwned.com/api/v3/breacheddomain/'+domain;
          fetch(url,{
            headers: {
              'hibp-api-key': '6114573cdf4f4af4a7d9b850cdbabb55'
            }
          })             
            .then((response) => response.json())
            .then((data) => {
              if (data.dns) {   
                let regex=/[^.]+\.[^.]+\.$/;
                company.mx = data.dns.mx[0].match(regex)[0];
                if (Object.entries(data.ipinfo)[0][1].asn.name){
                  company.hosting = Object.entries(data.ipinfo)[0][1].asn.name;
                } else {  
                  company.hosting = Object.entries(data.ipinfo)[1][1].asn.name;
                }
                company.ns = data.dns.ns[0].match(regex)[0];
                company.webserver = data.web.server;
              } else {
                  company.mx = '';               
                  company.hosting = '';
                  company.ns = '';
                  company.webserver = '';
              }
              setCompanyInfo(company);
              setIsLoading(false);
            })
            .catch((error) => console.error("An error occurred:", error));
           */

        setEmailAddresses(emailAddresses);
        /*   } else {
            console.error("Unexpected response structure:", err);
          }
        }); */
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <SimpleBackDrop text="&nbsp;&nbsp;Gathering Information" />;
  }

  return (
    <Dialog maxWidth="lg" fullWidth onClose={handleClose} open={open}>
      <DialogTitle>New Account Wizard</DialogTitle>

      <Box sx={{ m: 4, height: "60vh" }}>
        <Stepper sx={{ m: 4 }} variant="outlined" activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <React.Fragment>
          <Box sx={{ m: 4 }}>{getStepContent(activeStep)}</Box>
          <Box sx={{ display: "flex", position: "absolute", bottom: 10, pt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" color="primary" onClick={handleNext} sx={{ mr: 1 }}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      </Box>
    </Dialog>
  );
}

// Setting default values for the props of Sidenav
FirstLogin.defaultProps = {
  user: {},
};

// Typechecking props for the Sidenav
FirstLogin.propTypes = {
  user: PropTypes.any,
};
export default FirstLogin;
