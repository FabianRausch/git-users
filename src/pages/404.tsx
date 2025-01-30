import ErrorBase from "@/components/ui/ErrorBase";

export default function Custom404() {
  return (
    <ErrorBase
      title="404 - Not found page"
      description="We not found the user."
      labelLink="Try again with another one"
      href="/users"
    />
  );
}
