import { defineClientConfig } from "vuepress/client";


import { HopeIcon, Layout, NotFound, useScrollPromise, injectDarkmode, setupDarkmode, setupSidebarItems } from "/home/avalonc/navigator-jyutping/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.31_markdown-it@14.1.0_vidstack@1.10.9_vuepress@2.0.0-rc.8/node_modules/vuepress-theme-hope/lib/bundle/export.js";

import { defineCatalogInfoGetter } from "/home/avalonc/navigator-jyutping/node_modules/.pnpm/@vuepress+plugin-catalog@2.0.0-rc.20_vuepress@2.0.0-rc.8/node_modules/@vuepress/plugin-catalog/lib/client/index.js"
import { h } from "vue"

import "/home/avalonc/navigator-jyutping/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.31_markdown-it@14.1.0_vidstack@1.10.9_vuepress@2.0.0-rc.8/node_modules/vuepress-theme-hope/lib/bundle/styles/all.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.t;
  const shouldIndex = meta.I !== false;
  const icon = meta.i;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(HopeIcon, { icon }), title] : null,
    order: meta.O,
    index: meta.I,
  } : null;
});

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkmode(app);

    // provide HopeIcon as global component
    app.component("HopeIcon", HopeIcon);


  },
  setup: () => {
    setupDarkmode();
    setupSidebarItems();

  },
  layouts: {
    Layout,
    NotFound,

  }
});