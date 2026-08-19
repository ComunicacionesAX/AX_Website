/// <reference path="./sst-env.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ax-website",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: { region: "us-east-1" },
      },
    };
  },
  async run() {
    const mailchimpApiKey = new sst.Secret("MAILCHIMP_API_KEY");
    const mailchimpListId = new sst.Secret("MAILCHIMP_LIST_ID");
    const mailchimpTags = new sst.Secret("MAILCHIMP_TAGS", "");

    const site = new sst.aws.Nextjs("Web", {
      link: [mailchimpApiKey, mailchimpListId, mailchimpTags],
      environment: {
        MAILCHIMP_API_KEY: mailchimpApiKey.value,
        MAILCHIMP_LIST_ID: mailchimpListId.value,
        MAILCHIMP_TAGS: mailchimpTags.value,
      },
      server: {
        memory: "1024 MB",
        timeout: "20 seconds",
        architecture: "arm64",
      },
      imageOptimization: {
        memory: "1536 MB",
      },
      warm: 0,
      // domain: { name: "example.com", redirects: ["www.example.com"] },
    });

    return {
      url: site.url,
    };
  },
});
