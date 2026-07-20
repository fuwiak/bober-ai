export default {
  id: "webmaster",
  title: "Yandex Webmaster",
  description: "Hosts, feed, mirrors, verification status",
  visibility: "public",
  aliases: ["wm"],
  async run(ctx, args) {
    const [sub, ...rest] = args;
    if (!sub || sub === "help" || sub === "--help") {
      console.log(`yaga webmaster

  yaga webmaster status     overall webmaster + metrika snapshot
  yaga webmaster feed       upload performers feed
  yaga webmaster mirrors    mirror settings
  yaga webmaster repair     feed repair helper
`);
      return;
    }
    if (sub === "status") {
      await ctx.runScript("yandex-status.mjs", rest);
      return;
    }
    if (sub === "feed") {
      await ctx.runScript("yandex-webmaster-feed.mjs", rest);
      return;
    }
    if (sub === "mirrors") {
      await ctx.runScript("yandex-webmaster-mirrors.mjs", rest);
      return;
    }
    if (sub === "repair") {
      await ctx.runScript("yandex-feed-repair.mjs", rest);
      return;
    }
    await ctx.runScript("yandex-status.mjs", args);
  },
};
