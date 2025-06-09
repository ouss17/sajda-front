import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export const CheckUser = (props) => {
  const user = useSelector((state) => state.userReducer.value);

  const isLogged = () => {
    if (user.role === "") {
      return false;
    }
    return true;
  }

  return {isLogged};
};

const styles = StyleSheet.create({});


