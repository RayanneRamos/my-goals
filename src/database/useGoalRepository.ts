import { useSQLiteContext } from "expo-sqlite/next";

export type GoalCreateDatabaseProps = {
  name: string;
  total: string;
};

export function useGoalsRepository() {
  const database = useSQLiteContext();

  function create(goal: GoalCreateDatabaseProps) {
    const statement = database.prepareSync(
      "INSERT INTO goals (name, total) VALUES ($name, $total)"
    );

    statement.executeSync({
      $name: goal.name,
      $total: goal.total,
    });
  }

  return {
    create,
  };
}
