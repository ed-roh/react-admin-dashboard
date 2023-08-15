import { supabase } from "../supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  Dialog,
  DialogTitle,
  Box,
} from "@mui/material";


export default function AuthUI() {
  return (
      <Dialog maxWidth="sm" fullWidth open='true'>
      <DialogTitle>KnowByte Solutions CleaRisk&reg; Portal</DialogTitle>
      <Box sx={{ m: 4 }}>
      <Auth 
        supabaseClient={supabase}
        providers={[]}
        view="sign_in"
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
  );
}
