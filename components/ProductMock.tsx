import CaseMock from "./CaseMock";
import ShirtMock from "./ShirtMock";
import HoodieMock from "./HoodieMock";

export default function ProductMock({ product }: { product: any }) {
  if (product?.type === "shirt") {
    return <div className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center"><ShirtMock product={product} /></div>;
  }
  if (product?.type === "hoodie") {
    return <div className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center"><HoodieMock product={product} /></div>;
  }

  const colorStr = product?.activeColor || product?.shopifyVariants?.[0]?.title;
  const isLight = colorStr?.toLowerCase().includes('white') || false;
  
  const bgColor = isLight ? "bg-[#eeeeee]" : "bg-[#111111]";

  return (
    <div className={`w-full h-[95%] mx-auto rounded-[20%] shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative border border-white/10 overflow-hidden flex flex-col items-center justify-center ${bgColor} drop-shadow-2xl`}>
      <CaseMock product={product} />
    </div>
  );
}
