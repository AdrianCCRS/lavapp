import { Spinner } from "@heroui/spinner";

export default function SpinnerPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-200">
      <Spinner
        size="lg"
        variant="default"
        color="primary"
      />
    </div>
  );
}