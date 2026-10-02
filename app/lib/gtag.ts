export const GA_TRACKING_ID = "G-Z36DMC9GRF";

type GAParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const sendGAEvent = (eventName: string, eventParams?: GAParams) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

export const logScrollDepth = (percent: number) => {
  sendGAEvent("scroll_depth", {
    scroll_percent: percent,
  });
};

export const logTimeOnPage = (seconds: number) => {
  sendGAEvent("time_on_page", {
    time_seconds: seconds,
  });
};

export const logClick = (label: string) => {
  sendGAEvent("click", {
    click_label: label,
  });
};

export const logLinkTreeClick = (
  linkId: string,
  linkTitle: string,
  linkUrl: string,
) => {
  sendGAEvent("linktree_click", {
    link_id: linkId,
    link_title: linkTitle,
    link_url: linkUrl,
  });
};
