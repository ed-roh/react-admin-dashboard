import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

export const useProfile = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const domain_name = user.email.split("@")[1];

    async function getUserInfo() {
      try {
        //lookup domain in domains table to get customer_id (use .then)
        let {
          data: domainData,
          error: domainError,
          status: domainStatus,
        } = await supabase
          .from("domains")
          .select(`*`)
          .eq("domain", domain_name)
          .single();
        if (domainError && domainStatus !== 406) {
          throw domainError;
        }
        if (!domainData) {
          throw new Error("Domain not found");
        }
        let {
          data: customerData,
          error: customerError,
          status: customerStatus,
        } = await supabase
          .from("customers")
          .select(`*`)
          .eq("id", domainData.customer_id)
          .single();
        if (customerError && customerStatus !== 406) {
          throw customerError;
        }
        if (!customerData) {
          throw new Error("Customer not found");
        } else {
          let {
            data: userData,
            error: userError,
            status: userStatus,
          } = await supabase
            .from("users")
            .select(`*`)
            .eq("id", user.id)
            .single();
            let roles = userData.roles || [];
            if (user.id === customerData.id){ 
                roles.push("admin")
            }
            if (domain_name === "umbrella.tech"){
                roles.push("superuser")
            }
            let {
              data: peopleData,
              error: peopleError,
              status: peopleStatus,
            } = await supabase
              .from("people")
              .select(`*`)
              .eq("email", user.email)
              .eq("customer_id", customerData.id)
              .single();

            setProfile({
            roles: roles,
            user: { ...user, ...userData, ...peopleData },
            customer: { ...customerData },
            domain: { ...domainData },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUserInfo();
  }, []);

  return profile;
};
