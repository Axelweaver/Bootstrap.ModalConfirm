Add to YorApp/App_Start/BunldleConfig.cs 
next lines:

            bundles.Add(new ScriptBundle("~/bundles/modal-confirm").Include(
                "~/Scripts/modal-confirm.js"));

            bundles.Add(new StyleBundle("~/Content/modal-confirm").Include(
                "~/Content/modal-confirm.css"));


