import unittest

from support import run_solution


class Denominations2Test(unittest.TestCase):
    def test_case_01_286(self):
        """286."""
        result = run_solution('denominations-2', '286\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '100:2\n50:1\n10:3\n1:6\n')

    def test_case_02_730(self):
        """730."""
        result = run_solution('denominations-2', '730\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '100:7\n50:0\n10:3\n1:0\n')

    def test_case_03_45(self):
        """45."""
        result = run_solution('denominations-2', '45\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '100:0\n50:0\n10:4\n1:5\n')


if __name__ == "__main__":
    unittest.main()
