import pandas as pd
from sklearn.tree import DecisionTreeClassifier

def predict_decision(test_data):
    data = pd.read_csv('test2.csv')
    X = data.drop('decision', axis=1)
    y = data['decision']
    clf = DecisionTreeClassifier(criterion='gini')
    clf.fit(X, y)
    new = pd.DataFrame([test_data], columns=data.columns[:-1]) 
    y_pred = clf.predict(new)
    return y_pred

test_data = [1,0,0]

result = predict_decision(test_data)
print("ket qua:", test_data, result)
