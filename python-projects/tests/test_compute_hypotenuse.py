import unittest

from support import run_solution


class ComputeHypotenuseTest(unittest.TestCase):
    def test_case_01_legs_3_and_4(self):
        """Legs 3 and 4."""
        result = run_solution('compute-hypotenuse', '3\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n')

    def test_case_02_legs_6_and_8(self):
        """Legs 6 and 8."""
        result = run_solution('compute-hypotenuse', '6\n8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10\n')

    def test_case_03_legs_1_and_1(self):
        """Legs 1 and 1."""
        result = run_solution('compute-hypotenuse', '1\n1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')


if __name__ == "__main__":
    unittest.main()
