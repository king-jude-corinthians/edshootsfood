import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function BookingSuccess() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-[5vw]">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-10 h-10 text-brand" />
        </div>

        <h1 className="text-3xl md:text-4xl font-medium text-text-primary mb-4">
          Booking Confirmed!
        </h1>

        <p className="text-text-muted leading-relaxed mb-8">
          Thank you for your booking. You&apos;ll receive a confirmation email
          shortly. Ezekwe will be in touch to discuss the details of your
          session.
        </p>

        <Link href="/">
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
