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
from nav_msgs.msg import Odometry

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
        self.subscription_ = self.create_subscription(
            Odometry,
            '/odom',
            self.odom_callback,
            10)
        self.direction=direction
        self.target_distance = 0
        self.x = 0.0
        self.is_moving = False
        
        self.sending_request()

    def sending_request(self):
        msg = Twist()
        stop_msg = Twist()
        stop_msg.linear.x=0.0
        stop_msg.angular.z=0.0
        
        if self.direction.get('move') is not None:
            direction_value = self.direction['move']['direction']
            self.target_distance = float(self.direction['move']['distance'])
            msg.linear.x=float(moveBindings[direction_value][0] * 0.5)
            msg.angular.z=float(moveBindings[direction_value][3] * 0.5)

        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg)
        self.is_moving = True
        time.sleep(1)
        
        
    def odom_callback(self, msg):
    	if self.is_moving:
            self.current_distance = abs(msg.pose.pose.position.x - self.x)
            self.get_logger().info(str(msg.pose.pose.position.x))
            if self.current_distance < self.target_distance:
                self.get_logger().info(str(self.target_distance))
                self.get_logger().info(str(self.current_distance))
                self.get_logger().info('Not enough')
                self.sending_request()
            else:
                self.get_logger().info("Publishing finish")
                self.x = msg.pose.pose.position.x   
                self.is_moving = False  
  


def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)  
    #minimal_publisher.destroy_node()
    #rclpy.shutdown()

if __name__ == '__main__':

    main()
