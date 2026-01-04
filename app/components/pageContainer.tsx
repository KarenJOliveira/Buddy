import Footer from "./footer";

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="flex-1 w-[80vw] max-w-(--max-layout) mt-10 mx-auto pt-24 text-black">
        {children}
        <div id="portal" />
      </section>
      <Footer />
    </>
  );
}
