from flask import Flask, request, jsonify
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data = pd.read_csv('MauDataGoiY.csv')
X = data.drop('goi_y', axis=1)
y = data['goi_y']
clf = DecisionTreeClassifier(criterion='entropy')
clf.fit(X, y)

@app.route("/", methods=['POST'])
def test():
    test = request.get_json()
    dataInput = test_data.get('data', [])
    new = pd.DataFrame([dataInput], columns=X.columns) 
    ketQua = clf.predict(new)
    return jsonify({'ket_qua': ketQua.tolist()})  

if __name__ == '__main__':
    app.run(debug=True)
