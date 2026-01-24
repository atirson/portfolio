export const GA_TRACKING_ID = "G-Z36DMC9GRF";

export const sendGAEvent = (
action: string, category: string, label?: string, value?: number, p0?: { link_id: string; link_title: string; link_url: string; }) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};

export const logScrollDepth = (percent: number) => {
  sendGAEvent("scroll_depth", "engagement", `${percent}%`);
};

export const logTimeOnPage = (seconds: number) => {
  sendGAEvent("time_on_page", "engagement", undefined, seconds);
};

export const logClick = (label: string) => {
  sendGAEvent("click", "interaction", label);
};

export const logLinkTreeClick = (
  linkId: string,
  linkTitle: string,
  linkUrl: string
) => {
  sendGAEvent("linktree_click", "interaction", undefined, undefined, {
    link_id: linkId,
    link_title: linkTitle,
    link_url: linkUrl,
  });
};
