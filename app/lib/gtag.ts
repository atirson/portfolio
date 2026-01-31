export const GA_TRACKING_ID = "G-Z36DMC9GRF";

export const sendGAEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventParams);
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
  linkUrl: string
) => {
  sendGAEvent("linktree_click", {
    link_id: linkId,
    link_title: linkTitle,
    link_url: linkUrl,
  });
};