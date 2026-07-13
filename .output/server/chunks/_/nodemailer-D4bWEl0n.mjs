import { cva } from 'class-variance-authority';
import nodemailer from 'nodemailer';

var generatedData = {
  "links": {
    "categories_connection": { "nodes": [
      {
        "updatedAt": "2026-06-29T19:59:06.246Z",
        "name": "barbati",
        "visible": true,
        "seo": {
          "name": "barbatii",
          "description": "Haine pentru barbati alese special pentru tine",
          "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/ALDENO_6_TH_OCT_1519_5a401697da.webp" }
        },
        "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/ALDENO_6_TH_OCT_1519_5a401697da.webp" },
        "sub_categories_connection": { "nodes": [
          {
            "updatedAt": "2026-06-29T20:00:47.501Z",
            "name": "tricouri",
            "seo": {
              "name": "tricouru",
              "description": "Tricouri barbatesti cu modele si designe care sa te completeze.",
              "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/0b0097e829f747f68838461f21fdd689_f7d663d1a7.webp" }
            },
            "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/0b0097e829f747f68838461f21fdd689_f7d663d1a7.webp" }
          },
          {
            "updatedAt": "2026-06-30T14:13:58.933Z",
            "name": "hanorace",
            "seo": {
              "name": "Hanorace Barbati",
              "description": "xdfghnfgdhdfgh bffg fgnd ghfdn fdg  dn ",
              "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/res_8842d08c4434f9466c70019dcf794e51_91234218f6.avif" }
            },
            "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/res_8842d08c4434f9466c70019dcf794e51_74eb920f08.avif" }
          },
          {
            "updatedAt": "2026-06-30T14:16:53.343Z",
            "name": "pantaloni",
            "seo": {
              "name": "Pantaloni Barbati",
              "description": "Pantaloni Barbati svdsdvsdsdv   sd ",
              "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/res_32e34edcc55b32687892c25a7bd8e4ab_f2c9ca12f2.avif" }
            },
            "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/res_32e34edcc55b32687892c25a7bd8e4ab_f2c9ca12f2.avif" }
          },
          {
            "updatedAt": "2026-06-30T14:18:11.439Z",
            "name": "adidasi",
            "seo": {
              "name": "adidasi barbati",
              "description": "adidasi barbatiadidasi barbatiadidasi barbatiadidasi barbatiadidasi barbati",
              "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/A103_adidasi_barbati_online_alb_e_900x12345_30fb0cd27e.webp" }
            },
            "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/A103_adidasi_barbati_online_alb_e_900x12345_30fb0cd27e.webp" }
          }
        ] }
      },
      {
        "updatedAt": "2026-06-30T13:51:00.813Z",
        "name": "colectii",
        "visible": false,
        "seo": {
          "name": "colectii",
          "description": "gujdghjkhdfg",
          "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/ALDENO_6_TH_OCT_1519_5a401697da.webp" }
        },
        "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/ALDENO_6_TH_OCT_1519_5a401697da.webp" },
        "sub_categories_connection": { "nodes": [{
          "updatedAt": "2026-06-30T13:51:56.450Z",
          "name": "featured",
          "seo": {
            "name": "featured",
            "description": "featuredfeaturedfeaturedfeatured",
            "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/1_org_zoom_4_afc84ad003.webp" }
          },
          "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/1_org_zoom_4_afc84ad003.webp" }
        }, {
          "updatedAt": "2026-06-30T13:52:41.176Z",
          "name": "promotii",
          "seo": {
            "name": "promotii",
            "description": "promotiipromotiipromotiipromotii",
            "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/1_org_zoom_3_d3e59b63b8.webp" }
          },
          "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/1_org_zoom_3_d3e59b63b8.webp" }
        }] }
      },
      {
        "updatedAt": "2026-06-30T14:18:29.417Z",
        "name": "femei",
        "visible": true,
        "seo": {
          "name": "femei",
          "description": "femeifemeifemeifemeifemeifemeifemeifemeifemeifemeifemei",
          "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/1_org_zoom_4_afc84ad003.webp" }
        },
        "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/1_org_zoom_4_afc84ad003.webp" },
        "sub_categories_connection": { "nodes": [
          {
            "updatedAt": "2026-06-30T14:06:05.603Z",
            "name": "tricouri",
            "seo": {
              "name": "tricouri femei",
              "description": "asdc",
              "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/1_org_zoom_4_afc84ad003.webp" }
            },
            "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/1_org_zoom_4_afc84ad003.webp" }
          },
          {
            "updatedAt": "2026-06-30T14:14:53.851Z",
            "name": "hanorace",
            "seo": {
              "name": "Hanorace Barbati",
              "description": "xdfghnfgdhdfgh bffg fgnd ghfdn fdg  dn ",
              "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/682_IO_99_X_001_1_1154425_1_3f68b072d2.avif" }
            },
            "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/682_IO_99_X_001_1_1154425_1_3f68b072d2.avif" }
          },
          {
            "updatedAt": "2026-06-30T14:16:10.710Z",
            "name": "pantaloni",
            "seo": {
              "name": "Pantaloni Femeie",
              "description": "Pantaloni Femeie svdsdvsdsdv   sd ",
              "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/pantaloni_de_trening_dama_iron_aesthetics_cargo_negri_jpg_8777215bfb.webp" }
            },
            "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/pantaloni_de_trening_dama_iron_aesthetics_cargo_negri_jpg_8777215bfb.webp" }
          },
          {
            "updatedAt": "2026-06-30T14:19:17.323Z",
            "name": "adidasi",
            "seo": {
              "name": "adidasi femei",
              "description": "adidasi femeiadidasi femeiadidasi femeiadidasi femei",
              "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/product_129901_1b6ad489ce.jpg" }
            },
            "media": { "url": "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/product_129901_1b6ad489ce.jpg" }
          }
        ] }
      }
    ] },
    "colors_connection": { "nodes": [{
      "color_code": "#151515",
      "name": "negru"
    }, {
      "color_code": "#efefef",
      "name": "alb"
    }] },
    "sizes_connection": { "nodes": [{ "name": "XS" }] }
  }};
var site = { name: "AUXLOAD STORE" };
var navigationMenuTriggerStyle = cva("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent");
var navigation = [{
  label: "Home",
  to: "/",
  visible: true
}, ...{
  navLinks: generatedData.links.categories_connection.nodes.map((link) => {
    return {
      name: link.name,
      visible: link.visible,
      media: link.media?.url,
      sub_categories: link.sub_categories_connection.nodes.map((s) => {
        return {
          name: s.name,
          media: s.media?.url
        };
      })
    };
  }),
  colors: generatedData.links.colors_connection.nodes.map((c) => {
    return {
      name: c.name,
      color_code: c.color_code
    };
  }),
  sizes: generatedData.links.sizes_connection.nodes.map((s) => {
    return { name: s.name };
  })
}.navLinks.map((link) => {
  if (link.sub_categories?.length === 0 || !link.sub_categories) return {
    label: link.name,
    visible: link.visible,
    to: "/c/$category/{-$subCategory}",
    image: link.media
  };
  return {
    label: link.name,
    to: "/c/$category/{-$subCategory}",
    image: link.media,
    visible: link.visible,
    children: link.sub_categories.map((s) => {
      return {
        label: s.name,
        to: "/c/$category/{-$subCategory}",
        image: s.media
      };
    })
  };
})];
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});
async function sendEmail({ to, subject, text, html }) {
  return await transporter.sendMail({
    from: `${site.name} <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html
  });
}

export { site as a, navigationMenuTriggerStyle as b, generatedData as g, navigation as n, sendEmail as s };
//# sourceMappingURL=nodemailer-D4bWEl0n.mjs.map
