
from sklearn import tree
import pandas as pd


url="https://gwprojectflask.herokuapp.com/api/data/raw_results"
df = pd.read_json(url)
df.head()


df_data=df[['Data_Type','Correct']]
df_target=df['Chart_Type']
df_target.unique()


df_data_dummies = pd.get_dummies(df_data)
df_data_dummies.head()


data_names = ['Number Correct','DimensionVsMeasure','Comparison','Dimension(Location)VsMeasure','Dimension(Time)VsMeasure','MeasureVsMeasure']
target_names = df_target.unique()


clf = tree.DecisionTreeClassifier()
clf = clf.fit(df_data_dummies, df_target)

prediction = clf.predict([[1,0,0,1,0,0]])

print(prediction)



