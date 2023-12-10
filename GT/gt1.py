import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Đọc dữ liệu từ tệp CSV
data = pd.read_csv('test2.csv')

# Chia dữ liệu thành features (đặc trưng) và target (nhãn)
X = data.drop('decision', axis=1)
y = data['decision']
print(data)

# Chia dữ liệu thành tập huấn luyện và tập kiểm tra
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Tạo và huấn luyện mô hình Decision Tree
clf = DecisionTreeClassifier(criterion='gini')
clf.fit(X, y)

# đưa vào 1 data để test tốc có cháy không
# new = pd.DataFrame([[2,3,1,1]], columns=['toc', 'chieu_cao', 'can_nang', 'dung_kem'])
test = [1,0,1]
new = pd.DataFrame([test], columns=['weather','parents','money'])

# Dự đoán trên tập kiểm tra
y_pred = clf.predict(new)

# kết quả dự đoán của mô hình
# kq = data.target_names[y_pred][0]
print("ket qua:",test ,y_pred)

# import pandas as pd
# from sklearn.tree import DecisionTreeClassifier

# # Dữ liệu từ bảng bạn cung cấp
# data = pd.DataFrame({
#     'toc': [1, 1, 2, 1, 3, 2, 2, 1],
#     'chieu_cao': [2, 3, 1, 1, 2, 3, 2, 1],
#     'can_nang': [1, 2, 2, 2, 3, 3, 3, 1],
#     'dung_kem': [0, 1, 1, 0, 0, 0, 0, 1],
#     'ket_qua': ['chay', 'khong', 'khong', 'chay', 'chay', 'khong', 'khong', 'khong']
# })

# # Tạo và huấn luyện mô hình cây quyết định với phương pháp Gini Index
# clf = DecisionTreeClassifier(criterion='gini')
# X = data[['toc', 'chieu_cao', 'can_nang', 'dung_kem']]
# y = data['ket_qua']
# clf.fit(X, y)

# # Dự đoán cho giá trị [2, 3, 1, 0]
# test = [1, 1, 2, 1]
# new_data = pd.DataFrame([test], columns=['toc', 'chieu_cao', 'can_nang', 'dung_kem'])
# predicted_result = clf.predict(new_data)

# print("kq:",test, predicted_result)