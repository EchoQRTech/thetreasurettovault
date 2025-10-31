"use client";
import Script from "next/script";
import { useEffect } from "react";

export default function SignUpPage() {
  useEffect(() => {
    const initOutseta = () => {
      if (window.Outseta?.AuthWidget) {
        window.Outseta.AuthWidget.mount({
          selector: "#vault-signup",
          displayMode: "light",
          showSignUp: true,
        });
      } else {
        setTimeout(initOutseta, 100);
      }
    };
    initOutseta();
  }, []);

  return (
    <>
      {/* Outseta Embed (only on this page) */}
      <Script id="outseta-init">
        {`
          var o_options = {
            domain: 'treasuretto-llc.outseta.com',
            load: 'auth,customForm,emailList,leadCapture,nocode,profile,support'
          };
        `}
      </Script>
      <Script
        id="outseta-script"
        src="https://cdn.outseta.com/outseta.min.js"
        data-options="o_options"
      />

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#fff5f5] text-[#0A0A0A] font-sans">
        <div className="max-w-lg w-full bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-3xl p-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#A00028] via-[#C44D5C] to-[#CBAF7A] bg-clip-text text-transparent mb-6">
            Join The Vault
          </h1>
          <p className="text-gray-600 mb-8">
            Unlock reseller tools, AI automations, and weekly insights.
          </p>
          <div id="vault-signup"></div>
        </div>
      </main>
    </>
  );
}
