import { supabase } from "../supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Dialog, DialogTitle, Box } from "@mui/material";
import background from "../loginbg.jpg";

export default function AuthUI({view}) {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Dialog maxWidth="sm" fullWidth open="true">
        <DialogTitle>KnowBreach Solutions CleaRisk&reg; Portal</DialogTitle>
        <Box sx={{ m: 4 }}>
          <Auth
            supabaseClient={supabase}
            providers={[]}
            view={view}
            magicLink={true}
            appearance={{
              theme: ThemeSupa,
              variables: { 
                default: {
                  colors: {
                    brand: "#4444dd",
                    brandAccent: "#52525b",
                  },
                },
              },
            }}
            theme="default"
          />
        </Box>
      </Dialog>
    </div>
  );
}
