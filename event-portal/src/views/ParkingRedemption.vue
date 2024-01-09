<template>
  <div>
    <h1>Parking Tickets Redemption</h1>
    <div class="table-toolbar">
      <el-button @click="fetchGuestsData" type="primary">Refresh</el-button>
    </div>
    <!-- Table for Non-Redeemed Guests -->
    <el-table :data="guests" v-if="guests.length > 0" style="width: 100%">
      <el-table-column label="Company Name" prop="companyName"></el-table-column>
      <el-table-column label="Guest Name" prop="guestName"></el-table-column>
      <el-table-column label="Table Number" prop="tableNo"></el-table-column>
      <el-table-column label="Check-in Status" prop="checkin">
        <template #default="{ row }">
          <el-tag :type="row.checkin === 'Yes' ? 'success' : 'danger'">{{ row.checkin }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Driving" prop="driving">
        <template #default="{ row }">
          <el-tag :type="row.checkin === 'Yes' ? 'success' : 'danger'">{{ row.checkin }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Redeem Status">
        <template v-slot="{ row }">
          <el-checkbox v-model="row.redeem" @change="updateRedeemStatus(row.guestID, row.redeem)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="Updated At" prop="update_time"></el-table-column>
    </el-table>
    <div v-else>
      <!-- Display 'No redemption needed' when no driving guests -->
      <span style="color: grey; font-style: italic;">No redemption needed</span>
    </div>

    <!-- Table for Redeemed Guests -->
    <h2 style="padding-top: 50px;">Redeemed Guests</h2>
    <el-table :data="redeemedGuests" v-if="redeemedGuests.length > 0" style="width: 100%">
      <el-table-column label="Company Name" prop="companyName"></el-table-column>
      <el-table-column label="Guest Name" prop="guestName"></el-table-column>
      <el-table-column label="Table Number" prop="tableNo"></el-table-column>
      <el-table-column label="Check-in Status" prop="checkin">
        <template #default="{ row }">
          <el-tag :type="row.checkin === 'Yes' ? 'success' : 'danger'">{{ row.checkin }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Driving" prop="driving">
        <template #default="{ row }">
          <el-tag :type="row.checkin === 'Yes' ? 'success' : 'danger'">{{ row.checkin }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Redeem Status" prop="redeem">
        <template #default="{ row }">
          <el-tag :type="row.checkin === 'Yes' ? 'success' : 'danger'">{{ row.checkin }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Updated At" prop="update_time"></el-table-column>
    </el-table>
    <div v-else>
      <!-- Display message when no redeemed guests -->
      <span style="color: grey; font-style: italic;">No redeemed guests found.</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {ElTable, ElTableColumn, ElCheckbox, ElMessageBox, ElButton, ElTag} from 'element-plus';

export default {
  components: {
    ElTable,
    ElTableColumn,
    ElCheckbox,
    ElButton,
    ElTag,
  },
  setup() {
    const guests = ref([]); // Initialize guests data
    const redeemedGuests = ref([]); // Initialize redeemed guests data

    const fetchGuestsData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/ticket_redeem');
        if (!response.ok) {
          throw new Error('Failed to fetch data for guests');
        }
        const data = await response.json();

        // Sort the data by custom condition: redeem=Yes at bottom, then by update time
        data.sort((a, b) => {
          if (a.redeem === 'Yes' && b.redeem !== 'Yes') return 1;
          if (a.redeem !== 'Yes' && b.redeem === 'Yes') return -1;
          return new Date(b.update_time) - new Date(a.update_time);
        });

        // Set the redeem checkbox state based on conditions
        data.forEach(guest => {
          if (guest.driving === 'Yes' && guest.redeem === 'Yes') {
            guest.redeem = true; // Keep checkbox checked
          } else {
            guest.redeem = false; // Uncheck the checkbox
          }
        });

        guests.value = data;

        const redeemedResponse = await fetch('http://127.0.0.1:5000/redeemed_guests');
        if (!redeemedResponse.ok) {
          throw new Error('Failed to fetch data for redeemed guests');
        }
        const redeemedData = await redeemedResponse.json();
        redeemedGuests.value = redeemedData;
      } catch (error) {
        console.error('Error fetching guest data:', error);
      }
    };

    const updateRedeemStatus = async (guestID, newStatus) => {
      let confirmationMessage = '';
      if (newStatus) {
        confirmationMessage = 'Are you sure you want to redeem the ticket?';
      } else {
        confirmationMessage = 'Are you sure you want to undo the redemption of the guest?';
      }

      ElMessageBox.confirm(confirmationMessage, 'Confirm Action', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/update_redeem_status/${guestID}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({redeem: newStatus ? 'Yes' : 'No'}),
          });
          if (!response.ok) {
            throw new Error('Failed to update redeem status');
          }
          fetchGuestsData(); // Refresh the guest list on successful update
        } catch (error) {
          console.error('Error updating redeem status:', error);
        }
      }).catch(() => {
        // Handle cancel
        guests.value.forEach(guest => {
          if (guest.guestID === guestID) {
            guest.redeem = !newStatus; // Revert checkbox state
          }
        });
      });
    };

    const setInitialCheckStatus = (guest) => {
      if (guest.driving === 'Yes' && guest.redeem === 'No') {
        guest.redeem = false; // Uncheck the checkbox
      } else if (guest.redeem === 'Yes') {
        guest.redeem = true; // Check the checkbox
      }
    };

    onMounted(async () => {
      await fetchGuestsData();
      guests.value.forEach((guest) => setInitialCheckStatus(guest));
    });

    return {
      guests,
      redeemedGuests,
      fetchGuestsData,
      updateRedeemStatus,
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
