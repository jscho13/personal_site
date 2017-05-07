class AlterSubmissionDayName < ActiveRecord::Migration[5.0]
  def change
    rename_column :dsq_averages, :submission_day, :submission_date
  end
end
