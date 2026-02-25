import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CommonView } from "../../utils/common";
import CommonIcon from "../../components/CommonIcon";
import { COLORS } from "../../theme/colors";

const Search = () => {
  return (
    <CommonView>
      <View style={styles.container}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🔥 AI-Powered Retrieval</Text>
        </View>

        <Text style={styles.title}>
          Search your{"\n"}
          <Text style={styles.highlight}>digital density.</Text>
        </Text>

        <View style={styles.searchWrapper}>
          <CommonIcon type="Ionicons" name="search-outline" size={20} color="#999" />
          <TextInput
            placeholder="Type keywords (e.g. 'Confidential', 'Criminal')..."
            placeholderTextColor="#999"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
  },

  badge: {
    alignSelf: "center",
    backgroundColor: "#fff4e8",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginBottom: 30,
    elevation: 4,
  },

  badgeText: {
    color: "#ff7a00",
    fontWeight: "600",
    fontSize: 13,
  },

  title: {
    fontSize: 38,
    fontWeight: "800",
    textAlign: "center",
    color: "#111",
    lineHeight: 46,
    marginBottom: 45,
  },

  highlight: {
    color: "#ff7a00",
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: COLORS.dark4,
    borderRadius: 40,
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 5,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
  },

  button: {
    backgroundColor: "#ff7a00",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default Search;
