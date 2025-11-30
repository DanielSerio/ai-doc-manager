import { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

interface Breadcrumb {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  description: string;
  breadcrumbs: Breadcrumb[];
}

export function PageHeader({ description, breadcrumbs }: PageHeaderProps) {
  return (
    <header>
      <section>
        <div className="flex flex-col gap-y-2 px-4 py-2 bg-sidebar border-b">
          <h1 className="text-muted-foreground font-semibold">{description}</h1>
        </div>
        <Breadcrumb className="px-4 py-2 bg-card border-b">
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => {
              const isLastItem = index === breadcrumbs.length - 1;

              return (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    {breadcrumb.href ? (
                      <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {!isLastItem && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </section>
    </header>
  );
}