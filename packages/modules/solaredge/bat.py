#!/usr/bin/env python3
import logging
from pymodbus.constants import Endian

from modules.common import modbus
from modules.common import simcount
from modules.common.component_state import BatState
from modules.common.modbus import ModbusDataType
from modules.common.fault_state import ComponentInfo
from modules.common.store import get_bat_value_store

log = logging.getLogger(__name__)


def get_default_config() -> dict:
    return {
        "name": "SolarEdge Speicher",
        "id": 0,
        "type": "bat",
        "configuration": {
            "modbus_id": 1
        }
    }


class SolaredgeBat:
    def __init__(self, device_id: int, component_config: dict, tcp_client: modbus.ModbusClient) -> None:
        self.__device_id = device_id
        self.component_config = component_config
        self.__tcp_client = tcp_client
        self.__sim_count = simcount.SimCountFactory().get_sim_counter()()
        self.simulation = {}
        self.__store = get_bat_value_store(component_config["id"])
        self.component_info = ComponentInfo.from_component_config(component_config)

    def update(self, state: BatState) -> None:
        self.__store.set(state)

    def read_state(self):
        unit = self.component_config["configuration"]["modbus_id"]
        with self.__tcp_client:
            soc = self.__tcp_client.read_holding_registers(
                62852, ModbusDataType.FLOAT_32, wordorder=Endian.Little, unit=unit)
            power = self.__tcp_client.read_holding_registers(
                62836, ModbusDataType.FLOAT_32, wordorder=Endian.Little, unit=unit)

        topic_str = "openWB/set/system/device/" + str(
            self.__device_id)+"/component/"+str(self.component_config["id"])+"/"
        imported, exported = self.__sim_count.sim_count(
            power, topic=topic_str, data=self.simulation, prefix="speicher"
        )
        return BatState(
            power=power,
            soc=soc,
            imported=imported,
            exported=exported
        )
