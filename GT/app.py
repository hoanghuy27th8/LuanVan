from flask import Flask, request, jsonify
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data = pd.read_csv('MauDataGoiY.csv')
X = data.drop('goi_y', axis=1)
y = data['goi_y']
clf = DecisionTreeClassifier(criterion='gini')
clf.fit(X, y)

@app.route("/", methods=['POST'])
def test():
    test_data = request.get_json()
    data_input = test_data.get('data', [])
    new = pd.DataFrame([data_input], columns=X.columns) 
    y_pred = clf.predict(new)
    return jsonify({'ket_qua': y_pred.tolist()})  

if __name__ == '__main__':
    app.run(debug=True)
