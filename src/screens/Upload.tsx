import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { permission } from "../utils/permission";
import CommonIcon from "../components/CommonIcon";

const Upload = () => {
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCameraUpload = async () => {
    setLoading(true);
    const result: any = await permission.handleOnCamera();
    setLoading(false);

    if (result?.success) {
      setImage(result.image);
    } else {
      Alert.alert("Upload Cancelled");
    }
  };

  const handleGalleryUpload = async () => {
    setLoading(true);
    const result: any = await permission.handleOnGallery();
    setLoading(false);

    if (result?.success) {
      setImage(result.image);
    } else {
      Alert.alert("Upload Cancelled");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Document</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCameraUpload}>
          <CommonIcon type="Ionicons" name="camera" size={22} color="#fff" />
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleGalleryUpload}>
          <CommonIcon type="Ionicons" name="image" size={22} color="#fff" />
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#4F46E5" />}

      {image && (
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Preview</Text>
          <Image source={{ uri: image.uri }} style={styles.previewImage} />
          <Text style={styles.fileName}>{image.fileName}</Text>
        </View>
      )}
    </View>
  );
};

export default Upload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 25,
    color: "#111827",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "500",
  },
  previewCard: {
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    elevation: 6,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  fileName: {
    marginTop: 10,
    fontSize: 14,
    color: "#6B7280",
  },
});
