import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";
import AnalyticalOverview from "../screens/workspace/folderAnalyze/tabs/AnalyticalOverview";
import MindMap from "../screens/workspace/folderAnalyze/tabs/MindMap";
import SemanticGraph from "../screens/workspace/folderAnalyze/tabs/SemanticGraph";
import TopEntities from "../screens/workspace/folderAnalyze/tabs/TopEntities";
import LinkAnalysis from "../screens/workspace/folderAnalyze/tabs/LinkAnalysis";
import KeywordCloud from "../screens/workspace/folderAnalyze/tabs/KeywordCloud";
import DensityMap from "../screens/workspace/folderAnalyze/tabs/DensityMap";
import BankAnalysis from "../screens/workspace/folderAnalyze/tabs/BankAnalysis";
import AnalyzeTopTabBar from "./AnalyzeTopTabBar";
import { COLORS } from "../theme/colors";

interface Props {
    summaryData?: any;
    setSelectedTab: (tab: string) => void;

}

const Tab = createMaterialTopTabNavigator();

export const AnalyzeSummaryTabs: React.FC<Props> = ({ summaryData, setSelectedTab }) => {
    return (
        <Tab.Navigator
            tabBar={(props) => <AnalyzeTopTabBar {...props} />}
            screenOptions={{
                sceneStyle: { backgroundColor: COLORS.Transparent },
                swipeEnabled: true,
            }}
            screenListeners={{
                state: (e) => {
                    const index = e.data.state.index;
                    const routeName = e.data.state.routes[index].name;
                    setSelectedTab(routeName);
                },
            }}
        >
            <Tab.Screen name="Analytical Overview">
                {() => <AnalyticalOverview data={summaryData} />}
            </Tab.Screen>

            <Tab.Screen name="Mind Map">
                {() => <MindMap data={summaryData} />}
            </Tab.Screen>

            <Tab.Screen name="Semantic Graph">
                {() => <SemanticGraph data={summaryData} />}
            </Tab.Screen>

            <Tab.Screen name="Top Entities">
                {() => <TopEntities data={summaryData} />}
            </Tab.Screen>

            <Tab.Screen name="Link Analysis">
                {() => <LinkAnalysis data={summaryData} />}
            </Tab.Screen>

            <Tab.Screen name="Keyword Cloud">
                {() => <KeywordCloud data={summaryData} />}
            </Tab.Screen>

            <Tab.Screen name="Density Map">
                {() => <DensityMap data={summaryData} />}
            </Tab.Screen>

            <Tab.Screen name="Bank Analysis">
                {() => <BankAnalysis data={summaryData} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};