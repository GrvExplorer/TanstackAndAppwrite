import { Field, FieldProps, Form, Formik } from "formik";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useCreateBlog } from "@/lib/react-query/quries";
import { BlogType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
export interface BlogHandlerProps {
  blog?: BlogType;
  type?: string
}

export function BlogHandler(props: BlogHandlerProps) {
  const [open, setOpen] = useState(false);
  const { blog, type } = props;
  const { toast } = useToast();
  const cache = useQueryClient();
  const { mutateAsync: createBlog, isError } = useCreateBlog();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setOpen(true)}>
          {type==='update' ? 'Update': 'AddBlog'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
          {type==='update' ? 'Update Blog': 'AddBlog'}
          </DialogTitle>
          <DialogDescription>
            Enter your blog title and content
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Formik
            initialValues={{ title: "", content: "" }}
            onSubmit={async (values) => {
              console.log(values);
              const res = await createBlog(values);
              if (res) {
                setOpen(false);
                cache.invalidateQueries({
                  queryKey: ["getBlogs"],
                });
              } else {
                toast({
                  title: "Uh oh! Something went wrong.",
                  description: "There was a problem with your request.",
                  variant: "destructive",
                  action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                  ),
                });
              }
              return {
                ...values,
                title: "",
                content: "",
              };
            }}
          >
            <Form className="flex flex-col gap-4 justify-end">
              <label htmlFor="title">Title</label>
              <Field name="title">
                {({ field, meta }: FieldProps) => (
                  <div>
                    <Input type="text" {...field} />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>

              <label htmlFor="content">Content</label>
              <Field name="content">
                {({ field, meta }: FieldProps) => (
                  <div>
                    <Input type="text" {...field} />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
              <div className="flex justify-end">
                <Button className="mt-4" type="submit">
                  {isError ? "Error" : "Submit"}
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
}
