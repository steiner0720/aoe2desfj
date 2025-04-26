"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useMapConfigurationFields from "@/hooks/useMapConfigurationFields";
import MapConfiguration from "@/modules/mapConfiguration/MapConfiguration";
import RMSEditor from "@/modules/rmsEditor/RMSEditor";

function CreateMapPage() {
  const { data } = useMapConfigurationFields();
  const { formSchema, defaultValues } = data ?? {};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex h-full w-full justify-start gap-8 bg-slate-50 p-8">
      <FormProvider {...form}>
        <div className="flex h-full w-full gap-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w- space-y-8"
            >
              <MapConfiguration />
              <Button type="submit">Generate</Button>
            </form>
          </Form>
        </div>
        <div className="h-full w-full">
          <Tabs defaultValue="rms" className="h-full w-full">
            <TabsList>
              <TabsTrigger value="rms">.RMS</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="rms" className="h-[calc(100%-37px)] w-full">
              <RMSEditor />
            </TabsContent>
            <TabsContent value="preview">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </FormProvider>
    </div>
  );
}

export default CreateMapPage;
