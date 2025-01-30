import ErrorBase from "@/components/ui/ErrorBase";

export default function Custom500() {
  return (
    <ErrorBase
      title="500 - Unexpected Error"
      description="A problem occurred while trying to bring the information, try again
        later."
      labelLink="Try again later"
      href="/"
    />
  );
}
