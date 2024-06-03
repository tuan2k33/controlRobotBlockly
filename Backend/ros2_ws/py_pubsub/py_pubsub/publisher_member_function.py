# Copyright 2016 Open Source Robotics Foundation, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
import time
import rclpy
from rclpy.node import Node

from std_msgs.msg import String
from geometry_msgs.msg import Twist 
moveBindings = {
    'up': (1, 0, 0, 0),
    'down': (-1, 0, 0, 0),
    'left': (0, 0, 0, 1),
    'right': (0, 0, 0, -1),
}
class MinimalPublisher(Node):

    def __init__(self,direction):
        super().__init__('minimal_publisher')
        self.flag=True
        self.publisher_ = self.create_publisher(Twist, 'cmd_vel', 30)
        self.direction=direction
        
        #self.distance=distance
        #self.time=time
        
        self.sending_request()
        
        #rclpy.shutdown()
        # self.flag=True
        # self.timer = None

    def sending_request(self):
        msg = Twist()
        stop_msg = Twist()
        stop_msg.linear.x=0.0
        stop_msg.angular.z=0.0
        
        if self.direction.get('move') is not None:
            direction_value = self.direction['move']['direction']
            distance_value = float(self.direction['move']['distance'])
            #time_value = float(self.direction['move']['time'])
            msg.linear.x=float(moveBindings[direction_value][0] * distance_value)
            msg.angular.z=float(moveBindings[direction_value][3] * distance_value)

        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg)
        time.sleep(2)
	
        # self.publisher_.publish(stop_msg)
        # self.get_logger().info('Publishing stop: "%s"' % stop_msg)
        #self.destroy_node()
        #self.flag= not (self.flag)
        
        #self.i += 1


def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)  
    #minimal_publisher.destroy_node()
    #rclpy.shutdown()

if __name__ == '__main__':

    main()
