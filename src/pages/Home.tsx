import AppText from '@/atoms/AppText';
import React from 'react';
import {View, Text} from 'react-native';
import HomeStyle from './Home.style';

const TaskViewMode = {
  list: '리스트',
  calendar: '캘린더',
};

const Home = (): JSX.Element => {
  const currentTaskViewMode = TaskViewMode.list;

  return (
    <View style={HomeStyle.homeContainer}>
      <View testID="header" style={HomeStyle.header}>
        <View testID="title-section" style={HomeStyle.titleSection}>
          <AppText weight={500} size={25}>
            모든 할일 (23)
          </AppText>
        </View>
        <View testID="option-section" style={HomeStyle.optionSection}>
          <View testID="view-options" style={HomeStyle.viewOptions}>
            {Object.values(TaskViewMode).map((mode, index) => {
              const styles: any[] = [HomeStyle.viewOption];
              const selected = mode === currentTaskViewMode;

              if (index < Object.values(TaskViewMode).length - 1) {
                styles.push(HomeStyle.viewOption_notLast);
              }
              if (selected) {
                styles.push(HomeStyle.viewOption_selected);
              }
              console.log(mode, currentTaskViewMode);
              return (
                <View testID="view-option" key={mode} style={styles}>
                  <AppText
                    style={[
                      HomeStyle.viewOptionText,
                      selected ? HomeStyle.viewOptionText_selected : {},
                    ]}
                    size={10}>
                    {mode}
                  </AppText>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;
