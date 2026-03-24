import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { CommonView } from "../../utils/common";
import { useProfile } from "./ProfileController";
import CommonIcon from "../../components/CommonIcon";
import { COLORS } from "../../theme/colors";

export const Profile = () => {
  const {
    userData,
    loading,
    error,
    goBack,
    handleLogout
  } = useProfile();

  const [emailNotif, setEmailNotif] = React.useState(true);
  const [processingNotif, setProcessingNotif] = React.useState(true);
  const [marketingNotif, setMarketingNotif] = React.useState(false);
  const getInitials = (name?: string) => {
    if (!name) return "";

    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }

    return (
      words[0][0] + words[words.length - 1][0]
    ).toUpperCase();
  };
  return (
    <CommonView>
      <View style={styles.headerSide}>
        <TouchableOpacity onPress={goBack}>
          <CommonIcon
            type="Ionicons"
            name="arrow-back-outline"
            size={22}
            color={COLORS.BLACK}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.title}>Profile Settings</Text>
            <Text style={styles.subtitle}>
              Manage your account settings and preferences
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => handleLogout()}
            >
              <CommonIcon type="AntDesign" name="logout" size={24} color={COLORS.Red} />
            </TouchableOpacity>
          </View>
        </View>

        {/* PROFILE INFORMATION */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Profile Information</Text>

          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(userData.name) ? getInitials(userData.name) : "L2"}</Text>
            </View>

            <View>
              <TouchableOpacity style={styles.uploadBtn}>
                <Text style={styles.uploadText}>
                  Change Avatar
                </Text>
              </TouchableOpacity>

              <Text style={styles.smallText}>
                JPG, PNG or GIF. Max size 2MB
              </Text>
            </View>
          </View>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="john@example.com"
          />

          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>

        {/* SECURITY */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Security</Text>

          <Text style={styles.label}>
            Current Password
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter current password"
            secureTextEntry
          />

          <Text style={styles.label}>
            New Password
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry
          />

          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>
              Update Password
            </Text>
          </TouchableOpacity>
        </View>

        {/* NOTIFICATIONS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Notifications
          </Text>

          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleTitle}>
                Email Notifications
              </Text>
              <Text style={styles.smallText}>
                Receive email updates
              </Text>
            </View>

            <Switch
              value={emailNotif}
              onValueChange={setEmailNotif}
            />
          </View>

          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleTitle}>
                Processing Alerts
              </Text>
              <Text style={styles.smallText}>
                Get notified when processing completes
              </Text>
            </View>

            <Switch
              value={processingNotif}
              onValueChange={setProcessingNotif}
            />
          </View>

          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleTitle}>
                Marketing Emails
              </Text>
              <Text style={styles.smallText}>
                Receive updates and offers
              </Text>
            </View>

            <Switch
              value={marketingNotif}
              onValueChange={setMarketingNotif}
            />
          </View>
        </View>
      </ScrollView>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logoutButton: {
    padding: 8,
  },
  headerSide: {
    width: 80,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#FF6A00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  avatarText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  uploadBtn: {
    backgroundColor: "#EEE",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  uploadText: {
    fontSize: 13,
    fontWeight: "500",
  },

  label: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    fontSize: 14,
  },

  primaryBtn: {
    backgroundColor: "#FF6A00",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  secondaryBtn: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  secondaryBtnText: {
    fontWeight: "500",
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  toggleTitle: {
    fontWeight: "500",
    fontSize: 14,
  },

  smallText: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
});