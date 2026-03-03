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

interface Props {
    summaryData: any;
}

const Tab = createMaterialTopTabNavigator();

export const AnalyzeSummaryTabs: React.FC<Props> = ({ summaryData }) => {
    return (
        <Tab.Navigator
            tabBar={(props) => <AnalyzeTopTabBar {...props} />}
            screenOptions={{
                swipeEnabled: true,
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