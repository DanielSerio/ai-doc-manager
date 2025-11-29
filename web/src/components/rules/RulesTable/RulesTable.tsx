import { DataTable } from "@/components/table/DataTable";

export function RulesTable() {
  return (
    <DataTable
      id="rulesTable"
      columns={[]}
      data={[]}
      isLoading={false}
      error={null}
    />
  );
}