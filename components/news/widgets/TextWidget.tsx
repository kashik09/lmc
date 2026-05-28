/**
 * TextWidget — About the Blog sidebar widget
 *
 * Real LMC blurb, not placeholder lorem ipsum.
 */

export default function TextWidget() {
  return (
    <div className="border border-lmc-borderLight bg-white p-6">
      <h4 className="mb-4 border-b-2 border-lmc-green pb-3 font-heading text-[13px] font-bold uppercase tracking-[0.14em] text-lmc-grayDark">
        About the Blog
      </h4>

      <p className="text-[14px] leading-[1.7] text-[#555]">
        Lifeline Medical Centre publishes occasional notes on community health,
        wellness tips, and updates from the centre. Follow us on social media or
        contact us to stay informed about new articles.
      </p>
    </div>
  );
}
