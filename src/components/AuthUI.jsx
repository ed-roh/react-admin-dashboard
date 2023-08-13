import { supabase } from "../supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function AuthUI() {
  return (
    <div className="flex flex-col space-y-4">
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
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
    </div>
  );
}
