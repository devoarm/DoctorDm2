import React from 'react';
import Background from '../../../themes/BackGroundSession';
import {DataTable, TextInput} from 'react-native-paper';
import CardTable from '../../../components/CardTable';
import {StyleSheet, View, FlatList, IconButton,Image,ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BtGoBack from '../../../components/BtGoBack';
import { SearchBar } from 'react-native-screens';
import Colors from '../../../themes/Colors';
import { SearchSource } from 'jest';
export default function UserManagePage({navigation}) {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState();
  const [users, setUsers] = React.useState();
  const fetchUser = async () => {
    firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const addUsers = [];
        querySnapshot.forEach(documentSnapshot => {
          addUsers.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setUsers(addUsers);
      });
  };
  React.useEffect(() => {
    setPage(0);
    fetchUser();
  }, [itemsPerPage]);
  return (
    <Background>
      <BtGoBack />
      <Text style={{fontWeight: 'bold',textAlign: 'center',fontSize: 20, marginTop: 20}}>
          จัดการข้อมูลผู้ใช้งาน
        </Text>
        <View style={styles.image}>
          <Image 
            source={require('../../../../assets/bannerpatient.png')}
            style={{width: 337,height: 180}}
          /></View>
        <View style={styles.searchbar}>
          <TextInput
            style={styles.input}
            placeholder="ค้นหาข้อมูล"
        />
          <Image 
            source={require('../../../../assets/icon/search.png')}
            style={{width: 20,height: 20,marginEnd: 10}}
          />
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View styles={styles.container}>
        <CardTable>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>ลำดับ</DataTable.Title>
              <DataTable.Title>ชื่อ-นามสกุล</DataTable.Title>
              <DataTable.Title>CID</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={users}
              renderItem={({item, index}) => (
                <DataTable.Row
                  onPress={() => {
                    navigation.navigate('detailUser', {
                      userData: item,
                    });
                  }}>
                  <DataTable.Cell>{index + 1}</DataTable.Cell>
                  <DataTable.Cell>
                    {item.f_name} {item.l_name}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {item.cid}
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            />
            <DataTable.Pagination
              page={page}
              numberOfPages={3}
              onPageChange={page => setPage(page)}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              showFastPagination
              optionsLabel={'Rows per page'}
            />
          </DataTable>
        </CardTable>
      </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    marginTop: 50,
  },
  image:{
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchbar: {
    marginTop: 20,
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'transparent',
  }
});
