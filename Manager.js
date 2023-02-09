import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Modal,
  FlatList,
  Pressable,
  Image
} from "react-native";
import {useState} from 'react';

export default function App(props) {
  const route = props.route;
  const nameChuyenMH = route.params.name;
  const data = [
    {
      id: 1,
      name: 'Phạm Thành Đạo',
      price: 'Cp17302',
    },
    {
      id: 2,
      name: 'Nguyễn Đức Tuấn',
      price: 'Cp17302',
      URL:"sggg"
    },
  ];
  // De danh sach render lai khi co du lieu moi thi can 1 ds dang state
  const [productList, setProductList] = useState(data);
  const [isShowAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(0);
  const [nameValue, setNameValue] = useState('');
  const [priceValue, setPriceValue] = useState(0);

  const handleClose = () => {
    setNameValue(''); setPriceValue(0); setEditId(0);
    setShowAdd(false);
  }

  const handleAdd = () => {
    // Nếu có editId thì là đang sửa và cần cập nhật pt
    if (editId) {
      const newEditProductList = [...productList];
      for (let i = 0; i < newEditProductList.length; i++) {
        if (newEditProductList[i].id == editId) {
          newEditProductList[i].name = nameValue;
          newEditProductList[i].price = priceValue;
          newEditProductList[i].URL = Image;
        }
      }
      setProductList(newEditProductList);
      return handleClose();
    }

    // Khi bam Luu se goi ham nay
    // 1. Dinh nghia object moi se duoc them vao mang du lieu
    const newItem = {
      id: productList.length == 0
        ? 1
        : productList[productList.length - 1].id + 1,
      name: nameValue,
      price: priceValue
    };
    // 2. Them phan tu moi vao mang sau do cap nhat lai ds
    // ... se lay ra toan bo phan tu cua mang, sau do ghep cung phan tu moi
    const newProductList = [...productList, newItem];
    // 3. Cap nhat ds moi de hien thi
    setProductList(newProductList);
    // 4. Cap nhat input ve ds mac dinh va dong modal
    return handleClose();
  };

  const handleDelete = (deleteId) => {
    const newProductList = productList
      .filter(item => item.id !== deleteId);
    setProductList(newProductList);
  };

  // Hàm Sửa Chạy khi bấm nút sửa ở từng phần tử
  const handleEdit = (editId) => {
    // 1. Hiển thị modal lên
    setShowAdd(true);
    // 2. Truyền giá trị cần sửa vào TextInput
    const editItem = productList
      .find(item => item.id == editId);
    setNameValue(editItem.name);
    setPriceValue(editItem.price);
    setEditId(editItem.id);
  };

  return (
    <View style={styles.container}>
      <Text> {nameChuyenMH}</Text>
      {isShowAdd
        ? null
        : <Button title="Thêm Mới" onPress={() => setShowAdd(true)} />
      }
      {/* visible cua Modal se the hien trang thai an hien */}
      {/* Thay the cho cach dung toan tu 3 ngoi de an hien giao dien */}
      <Modal visible={isShowAdd} animationType="slide">
        <View>
          <Text  style ={styles.conn}>{nameValue}</Text>
          <TextInput placeholder="Tên"
            value={nameValue}
            onChangeText={(text) => setNameValue(text)}
          />
          <TextInput placeholder="Lớp" 
            value={priceValue}
            onChangeText={(text) => setPriceValue(text)}
          />
          <Button title="Hủy" onPress={() => handleClose()} />
          <Button title="Lưu" onPress={() => handleAdd()}/>
        </View>
      </Modal>
      <FlatList
        data={productList}
        renderItem={({item}) => <View>
          <Text>{item.id}</Text>
          <Text>Tên: {item.name}</Text>
          <Text>Lớp: {item.price}</Text>
          <Pressable onPress={() => handleEdit(item.id)}>
           <Text style={styles.con}>Sửa</Text>
          </Pressable>
          <Pressable onPress={() => handleDelete(item.id)}>
          <Text style={styles.con}>Xóa</Text>
          </Pressable>
        </View>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  text: {
    // tên của phần thay đổi giao diện
    color: "black",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 50,
  },
  con:{
    textAlign:'center',
    fontSize:20,
    color:'red'
  },
});
