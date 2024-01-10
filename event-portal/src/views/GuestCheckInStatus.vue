<template>
  <div>
    <h1>Guest Check-In Status</h1>
    <div class="table-toolbar">
      <el-button @click="fetchGuestsData" type="primary">Refresh</el-button>
    </div>
    <div class="table-container">
      <el-table :data="guestList" height="500" style="width: 100%">
        <el-table-column prop="companyName" label="Company Name"></el-table-column>
        <el-table-column prop="tableNo" label="Table Number"></el-table-column>
        <el-table-column prop="checkin" label="Check-in Status">
          <template #default="{ row }">
            <el-tag :type="row.checkin === 'Yes' ? 'success' : 'danger'">{{ row.checkin }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="Updated At"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { ElTable, ElTableColumn, ElTag, ElButton } from 'element-plus';

export default {
  components: {
    ElTable,
    ElTableColumn,
    ElTag,
    ElButton,
  },
  setup() {
    const guestList = ref([]); // Initialize guests data

    const fetchGuestsData = async () => {
      try {
        const response = await fetch('https://8.217.178.249/guest_list');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        guestList.value = data;
      } catch (error) {
        console.error('Error fetching guest data:', error);
      }
    };

    const refreshData = () => {
      fetchGuestsData(); // Manual refresh
    };

    // Automatic refresh every 5 minutes
    const interval = setInterval(fetchGuestsData, 5 * 60 * 1000);

    // Stop automatic refresh when component unmounts
    onMounted(() => {
      fetchGuestsData(); // Fetch data when component mounts
      return () => clearInterval(interval);
    });

    return {
      guestList,
      fetchGuestsData,
      refreshData,
    };
  },
};
</script>

<style>
.table-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.el-button__icon {
  color: white;
}
</style>
