import { Button, PageHeader } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="404"
      title="This page doesn't exist."
      intro={
        <>
          It may have moved. <span className="mt-8 block"><Button href="/">Back to home</Button></span>
        </>
      }
    />
  );
}
