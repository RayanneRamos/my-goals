import { useSQLiteContext } from "expo-sqlite/next";

type TransactionCreateDatabaseProps = {
  amount: number;
  goalId: number;
};

type TransactionResponseDatabaseProps = {
  id: string;
  amount: number;
  goal_id: number;
  created_at: number;
};

export function useTransactionRepository() {
  const database = useSQLiteContext();

  function findLatest() {
    try {
      return database.getAllSync<TransactionResponseDatabaseProps>(
        "SELECT* FROM transactions ORDER BY created_at DESC LIMIT 10"
      );
    } catch (error) {
      throw error;
    }
  }

  function findByGoal(goalId: number) {
    try {
      const statement = database.prepareSync(
        "SELECT * FROM transactions WHERE goal_id = $goal_id"
      );

      const result = statement.executeSync<TransactionResponseDatabaseProps>({
        $goal_id: goalId,
      });
    } catch (error) {
      throw error;
    }
  }

  return {
    findLatest,
    findByGoal,
  };
}
