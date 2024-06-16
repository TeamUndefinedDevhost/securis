import { Button } from "@/components/ui/button";
import { Lottie } from "@/components/common/Lottie";
import { holligate } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <>
      <div className="overflow-hidden py-4 lg:py-10">
        <div className="relative z-10">
          <div className="container gap-20 lg:gap-28 flex flex-col lg:flex-row items-center">
            <div className="max-w-2xl text-center mx-auto">
              <div className="max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  AI-Driven{" "}
                  <span className={cn("tracking-wider", holligate.className)}>
                    Signature
                  </span>{" "}
                  Verification System
                </h1>
              </div>
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  Leveraging Cutting-Edge AI and Image Processing to Strengthen
                  Fraud Detection and Enhance Transaction Security.
                </p>
              </div>
              <div className="mt-8 gap-3 flex justify-center">
                <Button size={"lg"}>Get started</Button>
                <Button size={"lg"} variant={"outline"}>
                  Learn more
                </Button>
              </div>
            </div>
            <div className="w-[480px]">
              <Lottie
                src="https://lottie.host/c6b22da1-740b-4324-aa02-63bb328a61dd/7s39BsqB1p.lottie"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
