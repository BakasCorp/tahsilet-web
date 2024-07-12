import bursa from "public/bursa.svg";
import istanbul from "public/istanbul.svg";
import konya from "public/konya.svg";
import sakarya from "public/sakarya.svg";
import { getBaseLink } from "src/utils";

export const cityConfigs: Record<string, any> = {
  bursa: {
    key: "bursa",
    link: getBaseLink("/", true),
    with: "Bursa ile",
    its: "Bursa'nın",
    full: "Bursa Sanayi Odası",
    logo: "https://www.btso.org.tr/image/logo.png",
    texts: {
      hero: "Ortak aklın gücüyle geleceğin kentine",
    },
    colors: {
      primary: "",
      secondary: "",
    },
    images: {
      hero: "",
      second: bursa.src,
      footer: "https://i.hizliresim.com/97pq8fz.png",
    },
  },
  konya: {
    key: "konya",
    link: getBaseLink("/", true),
    with: "Konya ile",
    its: "Konya'nın",
    full: "Konya Sanayi Odası",
    logo: "https://i.hizliresim.com/861rfcz.png",
    texts: {
      hero: "Konya sanayisi ile dünya arasındaki köprü",
    },
    colors: {
      primary: "",
      secondary: "",
    },
    images: {
      hero: "",
      second: konya.src,
      footer: "https://i.hizliresim.com/2avyu3e.png",
    },
  },
  istanbul: {
    key: "istanbul",
    link: getBaseLink("/", true),
    with: "İstanbul ile",
    its: "İstanbul'un",
    full: "İstanbul Sanayi Odası",
    logo: "https://i.hizliresim.com/kbfuovo.png",
    texts: {
      hero: "İstanbul büyürse Türkiye büyür",
    },
    colors: {
      primary: "",
      secondary: "",
    },
    images: {
      hero: "",
      second: istanbul.src,
      footer: "https://i.hizliresim.com/gnbeshr.png",
    },
  },
  sakarya: {
    key: "sakarya",
    link: getBaseLink("/", true),
    with: "Sakarya ile",
    its: "Sakarya'nın",
    full: "Sakarya Sanayi Odası",
    logo: "https://www.satso.org.tr/assets/img/satso-logo.png",
    texts: {
      hero: "Sakarya büyürse Türkiye büyür",
    },
    colors: {
      primary: "",
      secondary: "",
    },
    images: {
      hero: "",
      second: sakarya.src,
      footer: "https://i.hizliresim.com/1hfd5se.jpg",
    },
  },
};

export function getConfig(appName = "konya") {
  return cityConfigs[appName] || cityConfigs.konya;
}
